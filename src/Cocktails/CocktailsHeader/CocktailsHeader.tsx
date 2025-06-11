import { Button, Input, Layout } from "antd";
import React from "react";
import { CocktailsHeaderProps } from "../cocktails.types";

const CocktailsHeader = (props: CocktailsHeaderProps) => {
  const { isSelectedIngredients, onHandleSearch, onHandleIngredients } = props;

  return (
    <Layout.Header
      style={{
        padding: "20px 20px 0 20px",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: "#001529",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: "20px",
            cursor: "pointer",
            display: "flex",
          }}
        >
          <Button
            style={{
              fontSize: "22px",
              background: "transparent",
              border: "none",
              color: "white",
              paddingBottom: "1rem",
              borderBottom: !isSelectedIngredients
                ? "2px solid #e6007e"
                : "none",
            }}
            onClick={() => onHandleIngredients(false)}
          >
            Cocktails
          </Button>
          <Button
            style={{
              fontSize: "22px",
              background: "transparent",
              border: "none",
              color: "white",
              paddingBottom: "1rem",
              borderBottom: isSelectedIngredients
                ? "2px solid #e6007e"
                : "none",
            }}
            onClick={() => onHandleIngredients(true)}
          >
            Ingredients
          </Button>
        </div>

        {!isSelectedIngredients && (
          <Input.Search
            placeholder="Search by name"
            allowClear
            size="large"
            onSearch={onHandleSearch}
            style={{ maxWidth: 260 }}
          />
        )}
      </div>
    </Layout.Header>
  );
};
export default CocktailsHeader;
