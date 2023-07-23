import {render, screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import PreviewTab from './PreviewTab';

test('should render tablist', () => {
  render(<PreviewTab />);
  expect(
    screen.getByRole('tablist', {name: 'Code example tabs'})
  ).toBeInTheDocument();
});

it('should auto-select first tab', () => {
  render(<PreviewTab />);

  expect(screen.getByRole('tab', {name: 'Jest'})).toHaveAttribute(
    'aria-selected',
    'true'
  );
});

it('should not auto-select other tabs', () => {
  render(<PreviewTab />);
  expect(screen.getByRole('tab', {name: 'Chalk'})).toHaveAttribute(
    'aria-selected',
    'false'
  );
});

it('should show auto-selected tab panel', () => {
  render(<PreviewTab />);
  expect(screen.getByRole('tabpanel', {name: 'Jest'})).toBeInTheDocument();
});

it('should not show other tab panels', () => {
  render(<PreviewTab />);
  expect(
    screen.queryByRole('tabpanel', {name: 'Chalk'})
  ).not.toBeInTheDocument();
});

it('should select tab on click', async () => {
  const user = userEvent.setup();
  render(<PreviewTab />);

  const chalkTab = screen.getByRole('tab', {name: 'Chalk'});
  await user.click(chalkTab);

  await waitFor(() => {
    expect(chalkTab).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', {name: 'Jest'})).toHaveAttribute(
      'aria-selected',
      'false'
    );
  });
});

it('should show selected tab panel by default', () => {
  render(<PreviewTab />);

  expect(screen.getByRole('tabpanel', {name: 'Jest'})).toBeInTheDocument();
  expect(
    screen.queryByRole('tabpanel', {name: 'Chalk'})
  ).not.toBeInTheDocument();
});

it('should show selected tab panel when changed', async () => {
  const user = userEvent.setup();
  render(<PreviewTab />);

  const chalkTab = screen.getByRole('tab', {name: 'Chalk'});
  await user.click(chalkTab);

  await waitFor(() => {
    expect(screen.getByRole('tabpanel', {name: 'Chalk'})).toBeInTheDocument();
    expect(
      screen.queryByRole('tabpanel', {name: 'Jest'})
    ).not.toBeInTheDocument();
  });
});

it('should respond to keyboard navigation', async () => {
  const user = userEvent.setup();
  render(<PreviewTab />);

  screen.getByRole('tablist', {name: 'Code example tabs'}).focus();
  await user.keyboard('{arrowright}');

  await waitFor(() => {
    expect(screen.getByRole('tab', {name: 'Chalk'})).toHaveAttribute(
      'aria-selected',
      'true'
    );
    expect(screen.getByRole('tab', {name: 'Jest'})).toHaveAttribute(
      'aria-selected',
      'false'
    );
  });
});

it('should loop back when keyboard navigation at end', async () => {
  const user = userEvent.setup();
  render(<PreviewTab />);

  screen.getByRole('tablist', {name: 'Code example tabs'}).focus();
  await user.keyboard('{arrowright}');
  await user.keyboard('{arrowright}');

  await waitFor(() => {
    expect(screen.getByRole('tab', {name: 'Jest'})).toHaveAttribute(
      'aria-selected',
      'true'
    );
    expect(screen.getByRole('tab', {name: 'Chalk'})).toHaveAttribute(
      'aria-selected',
      'false'
    );
  });
});