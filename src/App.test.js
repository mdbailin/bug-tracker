import { render, screen } from '@testing-library/react';
import Chart from './components/chart/Chart';
import Featured from './components/featured/Featured';
import Navbar from './components/navbar/Navbar';

test('renders chart from mui', () => {
  render(<Chart />);
  const chart = screen.getAllByTestId("chart");
  expect(chart).toBeTruthy();

});

test('renders featured div', () => {
  render(<Featured />);
  const featured = screen.getAllByTestId("featured");
  expect(featured).toBeTruthy();

});

test('asserts that heading is rendered', () => {
  render(<Featured />);
  const h1 = screen.getByRole("heading");
  expect(h1).toBeInTheDocument();

});

test('renders navbar div', async () => {
  render(<Navbar />);
  const navbar = screen.getAllByTestId("navbar");
  expect(navbar).toBeTruthy();

});



