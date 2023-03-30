import {
  TitleStyled,
  InformationList,
  InformationItem,
  PropertyTitle,
  PropertyValue,
} from "./Information.styled";

export const Information = ({ character }) => {
  const properties = ["Gender", "Status", "Specie", "Origin", "Type"];
  return (
    <>
      <TitleStyled>Informations</TitleStyled>
      <InformationList>
        {properties.map((property) => {
          return (
            <InformationItem key={property}>
              <PropertyTitle>
                {property !== "Specie" ? property : "Species"}
              </PropertyTitle>
              <PropertyValue>
                {property !== "Origin" && property !== "Specie"
                  ? character[property.toLowerCase()]
                    ? character[property.toLowerCase()]
                    : "Unknown"
                  : property === "Origin"
                  ? character[property.toLowerCase()].name
                    ? character[property.toLowerCase()].name
                    : "Unknown"
                  : character.species
                  ? character.species
                  : "Unknown"}
              </PropertyValue>
            </InformationItem>
          );
        })}
      </InformationList>
    </>
  );
};
