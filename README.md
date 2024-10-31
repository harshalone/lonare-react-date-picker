# Lonare React Date Picker

A modern, customizable date picker component for React applications, built with Tailwind CSS. This component provides an intuitive interface for date selection with various configuration options.

![NPM Version](https://img.shields.io/npm/v/lonare-react-date-picker) 

![License](https://img.shields.io/npm/l/lonare-react-date-picker) 

![Bundle Size](https://img.shields.io/bundlephobia/min/lonare-react-date-picker)

![Demo GIF](https://raw.githubusercontent.com/harshalone/lonare-react-date-picker/main/src/images/1.gif)

## Features

- 📅 Clean and intuitive interface
- 🎨 Styled with Tailwind CSS
- 📱 Responsive design
- 🔧 Highly customizable
- 🎯 Date range restrictions
- 🚀 Easy to implement
- ⚡ Lightweight

## Installation

```bash
npm install lonare-react-date-picker
```

or with yarn:

```
yarn add lonare-react-date-picker
```

## Prerequisites

This package requires the following peer dependencies:

```json
{
  "react": ">=16.8.0",
  "react-dom": ">=16.8.0",
  "@heroicons/react": ">=2.0.0"
}
```

Make sure you have Tailwind CSS configured in your project.

## Usage

```jsx
import { DatePicker } from 'lonare-react-date-picker';

function App() {
  const handleDateChange = (date) => {
    console.log('Selected date:', date);
  };

  return (
    <DatePicker 
      setDate={handleDateChange}
      yearRange={{ before: 5, after: 5 }}
    />
  );
}
```

![Screenshot](https://raw.githubusercontent.com/harshalone/lonare-react-date-picker/main/src/images/2.png)

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `default_date` | `Date \| string` | `new Date()` | Initial date to display |
| `align` | `'left' \| 'right'` | `'left'` | Alignment of the date picker dropdown |
| `defaultYear` | `number` | `null` | Pre-selected year |
| `defaultMonth` | `number` | `null` | Pre-selected month (0-11) |
| `setDate` | `function` | `undefined` | Callback function when date is selected |
| `dateFuture` | `boolean` | `false` | Only allow future dates |
| `datePast` | `boolean` | `false` | Only allow past dates |
| `dateRangeStart` | `Date \| string` | `null` | Start date for range restriction |
| `dateRangeEnd` | `Date \| string` | `null` | End date for range restriction |
| `yearRange` | `object` | `{ before: 0, after: 5 }` | Number of years to show before/after current year |


## Examples

### Basic Usage
```jsx
<DatePicker setDate={(date) => console.log(date)} />
```

### With Date Range Restriction
```jsx
<DatePicker 
  dateRangeStart="2023-01-01"
  dateRangeEnd="2024-12-31"
  setDate={(date) => console.log(date)}
/>
```

### Future Dates Only
```jsx
<DatePicker 
  dateFuture={true}
  setDate={(date) => console.log(date)}
/>
```

### Custom Year Range
```jsx
<DatePicker 
  yearRange={{ before: 10, after: 10 }}
  setDate={(date) => console.log(date)}
/>
```

## Styling

The component uses Tailwind CSS classes for styling. You can override the default styles by wrapping the component in a parent element with custom Tailwind classes.

## Browser Support

- Chrome (and Chromium based browsers)
- Firefox
- Safari
- Edge

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Lonare
- GitHub: [@lonare](https://github.com/harshalone)
- npm: [@lonare](https://www.npmjs.com/~lonare)

## Acknowledgments

- Built with React
- Styled with Tailwind CSS
- Icons from Heroicons

## Changelog

### 1.0.0
- Initial release
- Basic date picker functionality
- Tailwind CSS styling
- Date range restrictions
- Year range customization

## Support

If you like this project, please consider giving it a ⭐️ on GitHub!

For bugs and feature requests, please [create an issue](https://github.com/lonaresahil/lonare-react-date-picker/issues).

## FAQ

### How do I customize the styling?
The component uses Tailwind CSS classes which can be overridden using your project's Tailwind configuration.

### Can I use this with Next.js?
Yes, the component is compatible with Next.js projects.

### Does it support form libraries?
Yes, you can integrate it with form libraries like Formik or React Hook Form using the \`setDate\` prop.
