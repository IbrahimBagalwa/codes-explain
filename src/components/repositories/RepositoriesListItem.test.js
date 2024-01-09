import { screen, render } from "@testing-library/react";
import RepositoriesListItem from "./RepositoriesListItem";
import { MemoryRouter } from "react-router";

function renderComponent() {
  const repository = {
    full_name: "facebook/react",
    language: "Javascript",
    description: "The library for web and native user interfaces",
    owner: "facebook",
    name: "react",
    html_url: "https://github.com/facebook/react",
  };
  render(
    <MemoryRouter>
      <RepositoriesListItem repository={repository} />
    </MemoryRouter>
  );
  return { repository };
}
// second way is to create a mock that components that we don't want to import this is somewho defined a fuck component
// jest.mock("../tree/FileIcon.js", () => {
//   return () => {
//     return "File Icon Component";
//   };
// });
test("Should display repository link", async () => {
  const { repository } = renderComponent();
  // this is one way of avoiding the warning 'act' function
  await screen.findAllByRole("img", { name: /javascript/i });

  const link = screen.getByRole("link");
  expect(link).toHaveAttribute("href", repository.html_url);
});

// this pause function help me just to debug and see which components are deplay before and after the pause
// const pause = () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve();
//     }, 100);
//   });
// };
