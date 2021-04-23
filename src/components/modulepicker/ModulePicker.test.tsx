import { fireEvent, render, screen } from '@testing-library/react';
import ModulePicker from './ModulePicker';

describe('The ModulePicker component', () => {
  it('has a title 💬', () => {
    render(<ModulePicker />);

    const captionText = screen.getByText(/Module Picker/i);
    expect(captionText).toBeInTheDocument();
  });

  describe('renders every available module with a caption and thumbnail.', () => {
    describe('renders the ImageViewer modules 📺', () => {
      it('renders the first one', () => {
        render(<ModulePicker />);

        const imageViewerText = screen.getByText(/Image Viewer 1/i);
        expect(imageViewerText).toBeInTheDocument();

        const imageViewerThumb = screen.getByAltText(
          'image-viewer-1-thumbnail'
        ) as HTMLImageElement;

        expect(imageViewerThumb).toBeInTheDocument();
        // We check if the image source is not empty
        expect(imageViewerThumb.src).not.toBeFalsy();
        // Just making sure...
        expect(imageViewerThumb.alt).toBe('image-viewer-1-thumbnail');
      });
      it('renders the second one', () => {
        render(<ModulePicker />);

        const imageViewerText2 = screen.getByText(/Image Viewer 2/i);
        expect(imageViewerText2).toBeInTheDocument();
      });
    });

    it('renders the ThrustersModule module 🚀', () => {
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
    it('renders the actuators module', () => {
      render(<ModulePicker />);

      const actuatorsModuleText = screen.getByText(/Actuators/i);
      expect(actuatorsModuleText).toBeInTheDocument();
    });
    it('renders the test board', () => {
      render(<ModulePicker />);

      const testBoardText = screen.getByText(/Test board/i);
      expect(testBoardText).toBeInTheDocument();
    });
    it('renders the pfd module', () => {
      render(<ModulePicker />);
      const pfdText = screen.getByText(/PFD/i);
      expect(pfdText).toBeInTheDocument();
    });
    it('render the VisionUI module', () => {
      render(<ModulePicker />);
      const visionUIText = screen.getByText(/Vision UI/i);
      expect(visionUIText).toBeInTheDocument();
    });
    it('renders the Waypoints module', () => {
      render(<ModulePicker />);
      const waypointsModuleText = screen.getByText(/Waypoints/i);
      expect(waypointsModuleText).toBeInTheDocument();
    });
    it('renders the PowerModule module', () => {
      render(<ModulePicker />)
      const powerModuleText = screen.getByText(/PowerModule/i)
      expect(powerModuleText).toBeInTheDocument()
    })
    it('renders the MissionManager module', () => {
      render(<ModulePicker />);
      const missionManagerModuleText = screen.getByText(/Mission Manager/i);
      expect(missionManagerModuleText).toBeInTheDocument();
    });
  });
});
