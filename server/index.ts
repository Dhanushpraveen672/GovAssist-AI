import express, { Request, Response } from 'express';
import cors from 'cors';
import { SCHEMES, addScheme, updateScheme, deleteScheme } from './data/schemes';
import { performAISearch } from './services/aiSearch';
import { evaluateEligibility } from './services/eligibilityEngine';
import { handleGovBotChat } from './services/aiAssistant';
import { handleSignIn, handleSignUp, handleSendOtp, handleVerifyOtp, getUserFromToken } from './services/authService';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health Check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'OK',
    service: 'GovAssist AI API Engine',
    schemesCount: SCHEMES.length,
    timestamp: new Date().toISOString(),
  });
});

// AUTH ENDPOINTS
app.post('/api/auth/signin', (req: Request, res: Response) => {
  const response = handleSignIn(req.body);
  if (!response.success) {
    res.status(400).json(response);
    return;
  }
  res.json(response);
});

app.post('/api/auth/signup', (req: Request, res: Response) => {
  const response = handleSignUp(req.body);
  if (!response.success) {
    res.status(400).json(response);
    return;
  }
  res.json(response);
});

app.post('/api/auth/send-otp', (req: Request, res: Response) => {
  const { phone } = req.body;
  const response = handleSendOtp(phone);
  res.json(response);
});

app.post('/api/auth/verify-otp', (req: Request, res: Response) => {
  const { phone, otp } = req.body;
  const response = handleVerifyOtp(phone, otp);
  if (!response.success) {
    res.status(400).json(response);
    return;
  }
  res.json(response);
});

app.get('/api/auth/me', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  const user = getUserFromToken(authHeader);
  if (!user) {
    res.status(401).json({ success: false, message: 'Unauthorized' });
    return;
  }
  res.json({ success: true, user });
});

// SCHEMES & AI VECTOR SEARCH ENDPOINTS
app.get('/api/schemes', (req: Request, res: Response) => {
  const { category, search, state, incomeGroup } = req.query;

  const result = performAISearch(
    (search as string) || '',
    (state as string) || 'All',
    (category as string) || 'All',
    (incomeGroup as string) || 'All'
  );

  res.json({
    success: true,
    total: result.totalMatches,
    data: result.data
  });
});

app.post('/api/schemes/search', (req: Request, res: Response) => {
  const { query, category, state, incomeGroup } = req.body;
  const aiSearchResult = performAISearch(
    query || '',
    state || 'All',
    category || 'All',
    incomeGroup || 'All'
  );

  res.json({
    success: true,
    query: query || '',
    detectedState: aiSearchResult.detectedState,
    detectedCategory: aiSearchResult.detectedCategory,
    totalMatches: aiSearchResult.totalMatches,
    data: aiSearchResult.data
  });
});

app.get('/api/schemes/:id', (req: Request, res: Response) => {
  const scheme = SCHEMES.find(s => s.id === req.params.id);
  if (!scheme) {
    res.status(404).json({ success: false, message: 'Scheme not found' });
    return;
  }
  res.json({ success: true, data: scheme });
});

// ADMIN SCHEME MANAGEMENT CRUD ENDPOINTS
app.post('/api/admin/schemes', (req: Request, res: Response) => {
  const newSchemeData = req.body;
  if (!newSchemeData.title || !newSchemeData.shortDescription) {
    res.status(400).json({ success: false, message: 'Title and short description are required.' });
    return;
  }
  const created = addScheme({
    id: newSchemeData.id || `scheme-${Date.now()}`,
    ...newSchemeData
  });
  res.status(201).json({ success: true, message: 'Scheme created successfully', data: created });
});

app.put('/api/admin/schemes/:id', (req: Request, res: Response) => {
  const updated = updateScheme(req.params.id, req.body);
  if (!updated) {
    res.status(404).json({ success: false, message: 'Scheme not found' });
    return;
  }
  res.json({ success: true, message: 'Scheme updated successfully', data: updated });
});

app.delete('/api/admin/schemes/:id', (req: Request, res: Response) => {
  const deleted = deleteScheme(req.params.id);
  if (!deleted) {
    res.status(404).json({ success: false, message: 'Scheme not found' });
    return;
  }
  res.json({ success: true, message: 'Scheme deleted successfully' });
});

app.post('/api/eligibility/check', (req: Request, res: Response) => {
  const profile = req.body;
  const results = evaluateEligibility(profile);

  res.json({
    success: true,
    evaluatedAt: new Date().toISOString(),
    totalEvaluated: results.length,
    results
  });
});

app.post('/api/ai/chat', (req: Request, res: Response) => {
  const { schemeId, message, language, profile } = req.body;
  const botResponse = handleGovBotChat(schemeId, message, language || 'en', profile);

  res.json({
    success: true,
    data: botResponse
  });
});

app.listen(PORT, () => {
  console.log(`🚀 GovAssist AI Backend API listening on http://localhost:${PORT}`);
});
