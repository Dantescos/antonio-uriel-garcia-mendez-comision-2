import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';




 export const postModels = sequelize.define('post', {
  title: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps:true
})

