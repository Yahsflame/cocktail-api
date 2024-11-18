import { jest } from "@jest/globals";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, within } from "@testing-library/react";
import DrinksList from "../components/DrinksList/DrinksList";

jest.mock("../../assets/images/prev.svg", () => "prev-icon-mock");
jest.mock("../../assets/images/next.svg", () => "next-icon-mock");

describe("DrinksList", () => {
  const mockDrinks = [
    {
      id: 1,
      name: "Mojito",
      category: "Cocktail",
      image: "mock-image-1.jpg",
    },
    {
      id: 2,
      name: "Margarita",
      category: "Cocktail",
      image: "mock-image-2.jpg",
    },
  ];

  const defaultProps = {
    drinks: mockDrinks,
    onDrinkSelect: jest.fn(),
    currentPage: 0,
    totalCount: 10,
    itemsPerPage: 5,
    onPageChange: jest.fn(),
    query: "",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders "All Drinks" when no query is provided', () => {
    render(<DrinksList {...defaultProps} />);
    expect(screen.getByText("All Drinks")).toBeInTheDocument();
  });

  test("renders search query when provided", () => {
    render(<DrinksList {...defaultProps} query="mojito" />);
    expect(screen.getByText("Search: mojito")).toBeInTheDocument();
  });

  test("renders drink items correctly", () => {
    render(<DrinksList {...defaultProps} />);

    const drinkItems = screen
      .getAllByRole("img")
      .map((img) => img.closest("div[style]"));

    mockDrinks.forEach((drink, index) => {
      const drinkElement = drinkItems[index];

      const nameElement = within(drinkElement).getByText(drink.name);
      expect(nameElement).toBeInTheDocument();

      const categoryElement = within(drinkElement).getByText(drink.category);
      expect(categoryElement).toBeInTheDocument();

      const image = within(drinkElement).getByAltText(drink.name);
      expect(image).toBeInTheDocument();
      expect(image.src).toContain(drink.image);
    });
  });

  test("calls onDrinkSelect when drink item is clicked", () => {
    const onDrinkSelect = jest.fn();
    render(<DrinksList {...defaultProps} onDrinkSelect={onDrinkSelect} />);

    fireEvent.click(screen.getByText("Mojito"));
    expect(onDrinkSelect).toHaveBeenCalledWith(1);
  });

  test("pagination is not rendered when total pages is 1", () => {
    render(<DrinksList {...defaultProps} totalCount={5} itemsPerPage={5} />);

    expect(screen.queryByTestId("next-button")).not.toBeInTheDocument();
    expect(screen.queryByTestId("prev-button")).not.toBeInTheDocument();
  });

  describe("Pagination", () => {
    test("renders pagination correctly", () => {
      render(<DrinksList {...defaultProps} />);

      expect(screen.getByText("Page 1 of 2")).toBeInTheDocument();
      expect(screen.getByTestId("next-button")).toBeInTheDocument();
      expect(screen.getByTestId("prev-button")).toBeInTheDocument();
    });

    test("previous button is disabled on first page", () => {
      render(<DrinksList {...defaultProps} currentPage={0} />);
      const prevButton = screen.getByTestId("next-button");
      expect(prevButton).toBeDisabled();
    });

    test("next button is disabled on last page", () => {
      render(
        <DrinksList
          {...defaultProps}
          currentPage={1}
          totalCount={10}
          itemsPerPage={5}
        />
      );
      const nextButton = screen.getByTestId("prev-button");
      expect(nextButton).toBeDisabled();
    });

    test("calls onPageChange when clicking next button", () => {
      const onPageChange = jest.fn();
      render(
        <DrinksList
          {...defaultProps}
          currentPage={0}
          onPageChange={onPageChange}
        />
      );

      const nextButton = screen.getByTestId("prev-button");
      fireEvent.click(nextButton);
      expect(onPageChange).toHaveBeenCalledWith(1);
    });

    test("calls onPageChange when clicking previous button", () => {
      const onPageChange = jest.fn();
      render(
        <DrinksList
          {...defaultProps}
          currentPage={1}
          onPageChange={onPageChange}
        />
      );

      const prevButton = screen.getByTestId("next-button");
      fireEvent.click(prevButton);
      expect(onPageChange).toHaveBeenCalledWith(0);
    });
  });

  test("renders empty drinks list correctly", () => {
    render(<DrinksList {...defaultProps} drinks={[]} totalCount={0} />);

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});
