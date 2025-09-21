export class ItemEntity {
  constructor(
    public name: string,
    public price: number,
    public description?: string,
  ) {
    //empty constructor
  }

  updatePrice(newPrice: number) {
    this.price = newPrice;
  }
  addDescription(description: string) {
    this.description = description;
  }
}
