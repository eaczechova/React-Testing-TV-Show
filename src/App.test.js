import React from 'react';
import { render, fireEvent, wait, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';
import { fetchShow as mockFetchShow } from './api/fetchShow';
import Dropdown from 'react-dropdown';


jest.mock('./api/fetchShow');

const mockEpisodes = {
	data: [
		{
			id: 553946,
			url:
				'http://www.tvmaze.com/episodes/553946/stranger-things-1x01-chapter-one-the-vanishing-of-will-byers',
			name: 'Chapter One: The Vanishing of Will Byers',
			season: 1,
			number: 1,
			airdate: '2016-07-15',
			airtime: '',
			airstamp: '2016-07-15T12:00:00+00:00',
			runtime: 60,
			image: {
				medium:
					'http://static.tvmaze.com/uploads/images/medium_landscape/67/168918.jpg',
				original:
					'http://static.tvmaze.com/uploads/images/original_untouched/67/168918.jpg',
			},
			summary:
				"<p>A young boy mysteriously disappears, and his panicked mother demands that the police find him. Meanwhile, the boy's friends conduct their own search, and meet a mysterious girl in the forest.</p>",
			_links: {
				self: {
					href: 'http://api.tvmaze.com/episodes/553946',
				},
			},
		},
		{
			id: 578663,
			url:
				'http://www.tvmaze.com/episodes/578663/stranger-things-1x02-chapter-two-the-weirdo-on-maple-street',
			name: 'Chapter Two: The Weirdo on Maple Street',
			season: 1,
			number: 2,
			airdate: '2016-07-15',
			airtime: '',
			airstamp: '2016-07-15T12:00:00+00:00',
			runtime: 60,
			image: {
				medium:
					'http://static.tvmaze.com/uploads/images/medium_landscape/72/181376.jpg',
				original:
					'http://static.tvmaze.com/uploads/images/original_untouched/72/181376.jpg',
			},
			summary:
				"<p>A young boy mysteriously disappears, and his panicked mother demands that the police find him. Meanwhile, the boy's friends conduct their own search, and meet a mysterious girl in the forest.</p>",
			_links: {
				self: {
					href: 'http://api.tvmaze.com/episodes/553946',
				},
			},
		},
	],
};

test('displays loading message', async() => {
	const { getByTestId } = render(<App />);
	expect(getByTestId('loading').textContent).toBe('Fetching data...');
});

test('renders episodes from API', async () => {
	mockFetchShow.mockResolvedValueOnce(mockEpisodes);
	render(<Dropdown />);
	expect(screen.getByText(/Select.../i)).toBeInTheDocument();
	const fetchEpisodesButton = screen.getByText(/Select.../i);
	fireEvent.click(fetchEpisodesButton);
	  
	expect(mockFetchShow).toHaveBeenCalledTimes(1);
	// const select = screen.getByText(/Season 1/i);
	// await wait(() => expect(select.toBeInTheDocument()));
})
