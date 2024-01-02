
export class CreateTodoDto {
  private constructor(
    public readonly text: string
  ) { }

  static create(props: { [key: string]: any }): [string?, CreateTodoDto?] {

    const text = props.text;

    if (!text) {
      return ["text is required", undefined];
    }

    return [undefined, new CreateTodoDto(text)];
  }
}