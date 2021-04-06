import React, { FunctionComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid as MUIGrid, GridSize, GridSpacing } from '@material-ui/core';

type GridProps = {
  container?: boolean | undefined
  spacing?: GridSpacing | undefined
  item?: boolean | undefined
  xs?: boolean | GridSize
  style?: React.CSSProperties;
  key?: React.Key | null | undefined
};

const DEFAULT_GRID_STYLE = {

};

const GenericGrid = withStyles({

})(MUIGrid);

const Grid: FunctionComponent<GridProps> = (props) => (
  <GenericGrid
    style={{
      ...DEFAULT_GRID_STYLE,
      ...props.style,
    }}
    data-testid="test-grid"
    container={props.container}
    spacing={props.spacing}
    item={props.item}
    xs={props.xs}
    key={props.key}
  >
  {props.children}
  </GenericGrid>
);

Grid.defaultProps = {
  style: {},
  container: false,
  item: false,
  xs: false
};

export default Grid;
