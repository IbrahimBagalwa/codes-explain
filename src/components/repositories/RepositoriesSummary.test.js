import { screen, render } from "@testing-library/react";
import RepositoriesSummary from "./RepositoriesSummary";

test("Should display primary language, stars, issues and forks of the repository", async () => {
  const repository = {
    language: "Javascript",
    stargazers_count: 20,
    open_issues: 1,
    forks: 30,
  };

  render(<RepositoriesSummary repository={repository} />);

  for (let key in repository) {
    const value = repository[key];
    const element = screen.getByText(new RegExp(value, "i"));

    expect(element).toBeInTheDocument();
  }
});
