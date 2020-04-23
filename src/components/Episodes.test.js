import React from 'react';
import { render } from '@testing-library/react';
import Episodes from './Episodes';

test('component renders without any episodes', () => {
	render(<Episodes episodes={[]} />);
});

test('renders list of episodes', () => {
	const mockEpisode = [
		{ id: 'id1', name: 'Chapter One: The Vanishing of Will Byers' },
	];
	const { queryAllByText, rerender } = render(<Episodes episodes={[]} />);

	let allEpisodes = queryAllByText(/Season/i);
	expect(allEpisodes).toHaveLength(0);

	// rerender the component with dummy data passed in as the new props
	rerender(<Episodes episodes={mockEpisode} />);
	allEpisodes = queryAllByText(/Season/i);
	expect(allEpisodes).toHaveLength(1);
});
