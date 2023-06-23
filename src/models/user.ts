// "use strict";

// import { Model } from "sequelize";

// export interface UserAttributes {
//   id: number;
//   name: string;
//   admin?: boolean;
// }

// module.exports = (sequelize: any, DataTypes: any) => {
//   class User extends Model<UserAttributes> implements UserAttributes {
//     id!: number;
//     first_name?: string;
//     last_name?: string;
//     email!: string;
//     company?: string;
//     validated?: boolean;
//     admin?: boolean;
//   }
//   User.init(
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         primaryKey: true,
//         autoIncrement: true,
//       },
//       first_name: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       last_name: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true,
//       },
//       company: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       validated: {
//         type: DataTypes.BOOLEAN,
//         allowNull: false,
//       },
//       admin: {
//         type: DataTypes.BOOLEAN,
//         allowNull: true,
//       },
//     },
//     {
//       sequelize,
//       modelName: "User",
//     }
//   );
//   return User;
// };
