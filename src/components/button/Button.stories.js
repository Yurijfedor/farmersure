import { Button } from "./Button";

export default {
  title: "Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      type: "string",
      description: "appearance option",
      defaultValue: "default",
      options: ["default", "filterBtn", "formBtn"],
      control: {
        type: "radio",
      },
    },

    size: {
      type: "string",
      description: "size option",
      options: ["small", "medium", "large"],
      control: {
        type: "radio",
      },
    },

    type: {
      type: "string",
      description: "type of button",
      defaultValue: "button",
      options: ["button", "submit"],
      control: {
        type: "radio",
      },
    },

    children: {
      type: "string",
      name: "label",
      defaultValue: "click me",
    },
  },
};

const Template = (arg) => <Button {...arg} />;

export const Default = Template.bind({});
Default.args = {
  children: "click me!",
  variant: "default",
};
