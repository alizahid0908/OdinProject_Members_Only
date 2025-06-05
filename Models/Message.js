import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';
import User from './user.js';

class Message extends Model {}

Message.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'Message'
});

// Define the relationship
Message.belongsTo(User, { as: 'author' });
User.hasMany(Message);

export default Message;