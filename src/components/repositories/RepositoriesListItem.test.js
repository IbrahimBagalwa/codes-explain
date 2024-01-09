import { screen, render, findByRole } from "@testing-library/react";
import RepositoriesListItem from "./RepositoriesListItem";
import { MemoryRouter } from "react-router";

function renderComponent() {
  const repository = {
    full_name: "facebook/react",
    language: "Javascript",
    description: "The library for web and native user interfaces",
    owner: { login: "facebook" },
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
  await screen.findByRole("img", { name: new RegExp(repository.language) });

  const link = screen.getByRole("link", { name: /github repository/i });
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

test("Should shows a fileicon with the appropriate icon", async () => {
  const { repository } = renderComponent();
  const icon = await screen.findByRole("img", {
    name: new RegExp(repository.language, "i"),
  });
  expect(icon).toHaveClass("js-icon");
  expect(icon).toBeInTheDocument();
});

test("Should shows the link to the editor page", async () => {
  const { repository } = renderComponent();
  await screen.findByRole("img", { name: new RegExp(repository.language) });

  const link = await screen.findByRole("link", {
    name: new RegExp(repository.owner.login),
  });
  expect(link).toHaveAttribute("href", `/repositories/${repository.full_name}`);
});
