import {
  Table,
  Column,
  Model,
  PrimaryKey,
  CreatedAt,
  DeletedAt,
  UpdatedAt,
  DataType,
  Default,
} from 'sequelize-typescript';
import { v4 as uuid } from 'uuid';

interface UserAttributes {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

interface UserCreationAttributes extends Omit<UserAttributes, 'id'> {}

@Table
export default class User extends Model<
  UserAttributes,
  UserCreationAttributes
> {
  @PrimaryKey
  @Default(uuid)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  override id: string = uuid();

  @Column({
    allowNull: false,
    unique: true, // Ensuring unique email addresses
  })
  email!: string;

  @Column({
    allowNull: false,
  })
  firstName!: string;

  @Column({
    allowNull: false,
  })
  lastName!: string;

  @Column({
    allowNull: false,
  })
  password!: string;

  @CreatedAt
  @Column({
    allowNull: false,
  })
  creationDate!: Date;

  @UpdatedAt
  @Column({
    allowNull: false,
  })
  updatedOn!: Date;

  @DeletedAt
  @Column({
    allowNull: true,
  })
  deletionDate!: Date;
}
