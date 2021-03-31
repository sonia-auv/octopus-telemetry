import { fireEvent, render, screen } from '@testing-library/react';
import ModulePicker from './ModulePicker';

describe('The ModulePicker component', () => {
  it('has a title 💬', () => {
    render(<ModulePicker />);

    const captionText = screen.getByText(/Module Picker/i);
    expect(captionText).toBeInTheDocument();
  });

  describe('renders every available module with a caption and thumbnail.', () => {
    it('Renders the ImageViewer module 📺', () => {
      render(<ModulePicker />);

      const imageViewerText = screen.getByText(/ImageViewer/i);
      expect(imageViewerText).toBeInTheDocument();

      const imageViewerThumb = screen.getByAltText(
        'image-viewer-thumbnail'
      ) as HTMLImageElement;

      expect(imageViewerThumb).toBeInTheDocument();
      // We check if the image source is not empty
      expect(imageViewerThumb.src).not.toBeFalsy();
      // Just making sure...
      expect(imageViewerThumb.alt).toBe('image-viewer-thumbnail');

      // TODO test if draggable
    });
    it('Renders the ThrustersModule module 🚀', () => {
      render(<ModulePicker />);

      const thrustersModuleText = screen.getByText(/Thrusters/i);
      expect(thrustersModuleText).toBeInTheDocument();

      const thrustersModuleThumb = screen.getByAltText(
        'thrusters-thumbnail'
      ) as HTMLImageElement;

      expect(thrustersModuleThumb).toBeInTheDocument();
      // We check if the image source is not empty
      expect(thrustersModuleThumb.src).not.toBeFalsy();
      // Just making sure...
      expect(thrustersModuleThumb.alt).toBe('thrusters-thumbnail');
    });
  });
});
