interface Bike {
  name: string;
  brand: string;
  price: number;
  category: "Mountain" | "Road" | "Hybrid" | "Electric";
  description: string;
  quantity: number;
  inStock: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export default Bike;
