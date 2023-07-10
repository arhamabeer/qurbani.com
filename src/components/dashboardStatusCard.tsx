import * as React from "react";
import Card from "@mui/material/Card";
import styles from "./components.module.scss";
import { SiHappycow } from "react-icons/si";
import { GiGoat, GiCamelHead, GiCow } from "react-icons/gi";

type CardProp = {
  label: string;
  quantity: number;
};

const icons = [
  <GiCow className="absolute left-5 bottom-5" size={80} />,
  <SiHappycow className="absolute left-5 bottom-5" size={80} />,
  <GiGoat className="absolute left-5 bottom-5" size={80} />,
  <GiCamelHead className="absolute left-5 bottom-5" size={80} />,
];

export default function StatusCard(props: CardProp) {
  const { label, quantity } = props;
  const check = label.split(" ")[1];
  const icon =
    check == "Animals"
      ? icons[0]
      : check == "Cows"
      ? icons[1]
      : check == "Goats"
      ? icons[2]
      : icons[3];
  return (
    <Card
      sx={{ maxWidth: 500, height: 250 }}
      className={
        styles.statusCardImg +
        " flex justify-center items-center flex-col w-96 m-2 rounded-lg cursor-pointer relative"
      }
    >
      {icon}
      <h1 className="text-2xl">{label}</h1>
      <h1 className="text-4xl">{quantity}</h1>
    </Card>
  );
}
