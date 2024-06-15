export type variantType= {
    type: string;
    value: string;
}

export type inventoryType ={
    quantity: number;
    inStock: boolean;
}

export type productType= {
    name: string;
    description: string;
    price: number;
    category: string;
    tags: string[];
    variants: variantType[];
    inventory: inventoryType;
  
} 