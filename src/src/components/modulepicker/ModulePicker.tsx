import { Fragment, useState } from 'react';
import './modulepicker.css';
import Module from './Module';
import { GeneralContext } from '../../context/generalContext';
import {
  ActiveModules,
  ModuleMetadata,
  ModulesMetadata,
} from './ModulesMetadata';

const ModulePicker = (props: any) => {
  const getIsModuleActive = (
    module: ModuleMetadata,
    activeModules: ActiveModules
  ) => {
    if (module.key in activeModules) {
      return activeModules.data[module.key].active;
    }
    return false;
  };
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
                inUse={getIsModuleActive(module, context.activeModules)}
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
