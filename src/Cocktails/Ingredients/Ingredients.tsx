import React, { useEffect, useState } from "react";
import { Card, Col, Divider, Row, Typography } from "antd";
import { INGREDIENTS } from "../cocktails.constants";
import { Ingredient, IngredientProps } from "../cocktails.types";

const Ingredients = (props: IngredientProps) => {
  const { isSelectedIngredients } = props;
  const [ingredients, setIngredients] = useState<Ingredient[]>();
  const [loading, setLoading] = useState(false);

  const { Title } = Typography;

  const fetchRandomIngredients = async (ingredient: string): Promise<any[]> => {
    try {
      setLoading(true);
      const fetchIngredients = async () => {
        try {
          const res = await fetch(INGREDIENTS);
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
          const data = await res.json();
          return data?.drinks;
        } catch (error: any) {
          console.error("Fetch failed:", error);
          return null;
        }
      };
      const ingredients = await fetchIngredients();
      setLoading(false);
      return ingredients;
    } catch (error: any) {
      setLoading(false);
      console.error("Fetch failed:", error.message);
      return [];
    }
  };

  useEffect(() => {
    const getIngredients = async () => {
      try {
        const ingredients = await fetchRandomIngredients(INGREDIENTS);
        setIngredients(ingredients);
      } catch (error) {
        console.error("Failed to fetch ingredients:", error);
        setIngredients([]);
      }
    };

    getIngredients();
  }, []);

  return (
    <div>
      {isSelectedIngredients && (
        <Row
          justify="center"
          style={{
            padding: "40px 0 0 0",
            textAlign: "center",
          }}
        >
          <div>
            <Title
              level={2}
              style={{
                letterSpacing: "5px",
                marginTop: "5rem",
                marginBottom: "8px",
                color: "white",
              }}
            >
              COCKTAIL INGREDIENTS
            </Title>
            <Divider
              style={{
                backgroundColor: "#e6007e",
                height: "4px",
                margin: "0 auto",
                width: "20px",
              }}
            />
          </div>
        </Row>
      )}

      <Row
        gutter={[24, 24]}
        style={{ marginTop: "5rem", overflowX: "hidden", gap: "2rem" }}
        justify="center"
      >
        {ingredients?.slice(0, 7).map((ingredient) => (
          <Col key={ingredient.idDrink} xs={22} sm={12} md={8} lg={5}>
            <Card
              loading={loading}
              cover={
                <img
                  alt={ingredient.strDrinkThumb}
                  src={ingredient.strDrinkThumb}
                  style={{ width: "100%", objectFit: "cover" }}
                />
              }
              style={{
                boxShadow: "0 4px 16px rgba(211, 211, 211, 0.6)",
                backgroundColor: "#f8f8f8",
              }}
            >
              <Title level={4} style={{ marginBottom: 12 }}>
                {ingredient.strDrink}
              </Title>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Ingredients;
