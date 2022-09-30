interface IIngredientsItem {
  quantity: number;
  calories: number;
  carbohydrates: number;
  fat: number;
  price: number;
  proteins: number;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  type: string;
  _id: string;
  uid?: string;
  id?: string;
}

interface IIngredient {
  image_large: string;
  text: string;
  name: string;
  calories: number;
  proteins: number;
  fat: number;
  carbohydrates: number;
}
