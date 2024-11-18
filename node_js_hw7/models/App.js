import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const App = sequelize.define(
  "App",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.DECIMAL(7, 2),
      allowNull: false,
    },
  },
  {
    tableName: "Apps",
    timestamps: false,
  }
);

export default App;
