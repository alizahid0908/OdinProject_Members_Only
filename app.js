import express from 'express';
import session from 'express-session';
import passport from './config/passport.js';
import flash from 'express-flash';
import sequelize from './config/database.js';
import authRoutes from './routes/auth.js';
import membershipRoutes from './routes/membership.js';
import messageRoutes from './routes/messages.js';
import dotenv from 'dotenv';
import { checkMembership } from './middleware/auth.js';
import { getAllMessages } from './controllers/messageController.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));


app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(checkMembership);
app.use((req, res, next) => {
    res.locals.user = req.user;
    res.locals.isMember = res.locals.isMember;
    res.locals.isAdmin = res.locals.isAdmin;
    next();
});


app.use('/auth', authRoutes);
app.use('/membership', membershipRoutes);
app.use('/messages', messageRoutes);
app.get('/signup', (req, res) => {
    res.render('signup');
});
app.get('/', getAllMessages);

async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully');
    await sequelize.sync();
    console.log('Models synchronized with database');
  } catch (error) {
    console.error('Database connection error:', error);
  }
}

initializeDatabase();

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

export default app;