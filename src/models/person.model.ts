import mongoose, { Document, Schema } from 'mongoose';

interface IPerson extends Document {
  name: string;
  age: number;
}

const personSchema = new Schema<IPerson>({
  name: { type: String, required: true },
  age: { type: Number, required: true },
});

const Person = mongoose.model<IPerson>('Person', personSchema);

export { Person, IPerson };
