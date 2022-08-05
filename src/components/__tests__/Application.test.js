import React from "react";

import {
  render,
  cleanup,
  waitForElement,
  getByText,
  fireEvent,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  queryByText,
  prettyDOM,
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for the day by 1", async () => {
    const { container } = render(<Application />);
    //Wait for the application to load with data from mock server
    await waitForElement(() => getByText(container, "Archie Cohen"));

    //Select the first empty appointment and click on the "Add" button
    const appointment = getAllByTestId(container, "appointment")[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    //Update the name input field with a student's name, select an instructor and save
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(container, "Save"));

    //Checks to see that we transition() to Saving before rendering the newly booked interview
    expect(getByText(container, "Saving")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    //Checks to see that the appointment was created properly, by looking at all of the components in the SHOW element (we already know Lydia is there due to line 52)
    expect(getByText(appointment, "Sylvia Palmer")).toBeInTheDocument();
    expect(getByAltText(appointment, "Edit")).toBeInTheDocument();
    expect(getByAltText(appointment, "Delete")).toBeInTheDocument();

    //Checks to see that the spots remaining for Monday are updated correctly
    const day = getAllByTestId(container, "day").find((day) =>
      getByText(day, "Monday")
    );

    expect(queryByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview, and increases the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment").find(
      (appointment) => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(getByAltText(appointment, "Delete"));
    //Checks to see that the confirmation window appears
    expect(
      getByText(
        appointment,
        /are you sure you wish to delete this appointment?/i
      )
    ).toBeInTheDocument();

    fireEvent.click(getByText(appointment, "Confirm"));

    //Confirms that the "Deleting" mode is shown while awaiting server response
    await waitForElement(() => getByText(appointment, "Deleting"));
    //Confirms that the interview with Archie Cohen was deleted
    expect(queryByText(appointment, "Archie Cohen")).not.toBeInTheDocument();

    //Checks to see that the spots remaining for Monday are updated correctly
    const day = getAllByTestId(container, "day").find((day) =>
      getByText(day, "Monday")
    );

    expect(queryByText(day, "2 spots remaining")).toBeInTheDocument();
  });
});
