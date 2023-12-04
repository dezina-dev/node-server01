import mongoose, { Document, Schema, Types } from 'mongoose';
import { IPerson } from './person.model';

interface IExpense extends Document {
  amount: number;
  category: string;
  date: Date;
  person: Types.ObjectId; // Correct type for referencing Person
}

const expenseSchema = new Schema<IExpense>({
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  date: { type: Date, required: true },
  person: { type: Schema.Types.ObjectId, ref: 'Person', required: true },
});

const Expense = mongoose.model<IExpense>('Expense', expenseSchema);

export { Expense, IExpense };
