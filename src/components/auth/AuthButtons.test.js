import { screen, render, findAllByRole } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import AuthButtons from "./AuthButtons";
import { createServer } from "../../test/server";

async function renderComponent() {
  render(
    <MemoryRouter>
      <AuthButtons />
    </MemoryRouter>
  );
  await screen.findAllByRole("link");
}
describe("When user is not signed in", () => {
  createServer([
    {
      path: "/api/user",
      res: () => {
        return {
          user: null,
        };
      },
    },
  ]);
  test("When user is not signed in, sign in and sign up are visible", async () => {
    await renderComponent();
    const signInButton = screen.getByRole("link", { name: /sign in/i });
    const signUpButton = screen.getByRole("link", { name: /sign up/i });

    expect(signInButton).toHaveAttribute("href", "/signin");
    expect(signInButton).toBeInTheDocument();
    expect(signUpButton).toHaveAttribute("href", "/signup");
    expect(signUpButton).toBeInTheDocument();
  });

  test("When user is not signed in, sign out is not visible", async () => {
    await renderComponent();
    const signOutButton = screen.queryByRole("link", { name: /sign out/i });
    expect(signOutButton).toBeNull();
    expect(signOutButton).not.toBeInTheDocument();
  });
});
// describe("When user is signed in", () => {
//   createServer([
//     {
//       path: "/api/user",
//       res: () => {
//         return {
//           user: { id: 1, email: "foo@bar.com" },
//         };
//       },
//     },
//   ]);
//   test("When user is signed in, sign in and sign up are not visible", async () => {
//     await renderComponent();
//   });
//   test("When user is signed in, sign out is visible", async () => {
//     await renderComponent();
//   });
// });
