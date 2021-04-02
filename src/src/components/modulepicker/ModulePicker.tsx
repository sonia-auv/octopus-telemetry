import { Fragment, useState } from 'react';
import './modulepicker.css';
import Module from './Module';
import { GeneralContext } from '../../context/generalContext';
import { ModulesMetadata } from './ModulesMetadata';

const ModulePicker = (props: any) => {
  return (
    <GeneralContext.Consumer>
      {(context) => (
        // TODO put in Material UI drawer component
        <div className="ModulePicker">
          <h1 className="ModulePicker__title">Module Picker</h1>
          <ul className="ModulePicker__list">
            {ModulesMetadata.map((module, index) => (
              <Module
                key={index}
                id={index}
                name={module.name}
                thumbnailSource={module.thumbnailSource}
                thumbnailLabel={module.thumbnailLabel}
                inUse={context.activeModules.data[module.key].active}
                toggleInUse={(v: boolean) => {
                  let m = context.activeModules.data[module.key];
                  context.updateActiveModule(m, !v);
                  return v;
                }}
              />
            ))}
          </ul>
        </div>
      )}
    </GeneralContext.Consumer>
  );
};

export default ModulePicker;
