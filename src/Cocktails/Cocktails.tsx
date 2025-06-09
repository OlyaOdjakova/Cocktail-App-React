import React, { useEffect, useState } from "react";
import {
  Card,
  Typography,
  List,
  Col,
  Row,
  Input,
  Spin,
  Divider,
  Button,
} from "antd";
import { Layout } from "antd";
import { Cocktail } from "./cocktails.types";
import { getIngredientsWithMeasures } from "./cocktails.utils";

const { Header, Content } = Layout;
const { Search } = Input;
const { Title, Paragraph } = Typography;

const Cocktails = () => {
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRandomCocktails();
  }, []);

  const fetchRandomCocktails = async () => {
    try {
      setLoading(true);
      const fetchPromises = Array.from({ length: 3 }, () =>
        fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php").then(
          async (res) => {
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            const data = await res.json();
            return data.drinks?.[0] as Cocktail;
          },
        ),
      );

      const cocktails: Cocktail[] = await Promise.all(fetchPromises);

      console.log(cocktails);
      setCocktails(cocktails);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      console.error("Fetch failed:", error.message);
    }
  };

  const handleSearch = async (value: string) => {
    const term = value.trim().toLowerCase();

    if (!term) {
      fetchRandomCocktails();
      return;
    }
    // fetchCocktailByAlcoholic();
    const filtered = cocktails.filter((cocktail) =>
      cocktail.strDrink.toLowerCase().includes(term),
    );
    setCocktails(filtered);
  };

  return (
    <div
      style={{
        height: "100%",
        fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
      }}
    >
      <Header
        style={{
          background: "",
          padding: "0 24px",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ color: "white", fontSize: "20px", cursor: "pointer" }}>
            Cocktails{" "}
            <span style={{ marginLeft: "20px", cursor: "pointer" }}>
              Ingredients
            </span>
          </div>
          <Search
            placeholder="Search by name"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={handleSearch}
            style={{ maxWidth: 400 }}
          />
        </div>
      </Header>

      <Content
        style={{
          padding: "24px",
          background: "white",
          minHeight: "100vh",
          backgroundColor: "#001529",
        }}
      >
        <Row
          justify="center"
          style={{
            padding: "40px 0 10px",
            marginBottom: "4rem",
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
              LIST OF COCKTAILS
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

        <Row gutter={[16, 16]} justify="center">
          {loading ? (
            <Spin
              size="large"
              style={{ transform: "scale(2)", margin: "50px 0" }}
            />
          ) : cocktails.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                marginTop: 50,
                fontSize: 18,
                color: "white",
              }}
            >
              No cocktails found.
            </div>
          ) : (
            cocktails.map((cocktail) => (
              <Col key={cocktail.idDrink} xs={24} sm={12} md={8} lg={6}>
                <Card
                  loading={loading}
                  cover={
                    <img alt={cocktail.strDrink} src={cocktail.strDrinkThumb} />
                  }
                  style={{
                    boxShadow: "0 4px 16px rgba(211, 211, 211, 0.6)",
                    backgroundColor: "#f8f8f8",
                  }}
                >
                  <Title level={4} style={{ marginBottom: 12 }}>
                    {cocktail.strDrink}
                  </Title>

                  <List
                    size="small"
                    header={<strong>Measures:</strong>}
                    dataSource={getIngredientsWithMeasures(cocktail)}
                    renderItem={(item) => <List.Item>{item}</List.Item>}
                    style={{ marginBottom: 12 }}
                  />
                  <Paragraph style={{ fontSize: "0.9rem" }}>
                    <strong>How to make:</strong> {cocktail.strInstructions}
                  </Paragraph>

                  <Paragraph style={{ fontSize: "0.9rem" }}>
                    <strong>Glass type:</strong> {cocktail.strGlass}
                  </Paragraph>
                </Card>
              </Col>
            ))
          )}
        </Row>

        <Row
          justify="center"
          style={{
            padding: "40px 0 10px",
            marginBottom: "4rem",
            textAlign: "center",
          }}
        >
          <Button type="primary" onClick={fetchRandomCocktails} size="large">
            🍹 LOAD NEW COCKTAILS
          </Button>
        </Row>
      </Content>
    </div>
  );
};

export default Cocktails;
