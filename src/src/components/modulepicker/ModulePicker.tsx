import {Fragment, useState} from 'react'
import './modulepicker.css';
import Module from './Module';
import {GeneralContext} from '../../context/generalContext'
import { ModulesMetadata } from './ModulesMetadata'

const ModulePicker = (props: any) => {

  return (
    <GeneralContext.Consumer>
      {context => (
        <div className="ModulePicker">
          {JSON.stringify(context.activeModules.data)}
          <hr />
          {JSON.stringify(ModulesMetadata)}
          <h1 className="ModulePicker__title">Module Picker</h1>
          <ul className="ModulePicker__list">
            {ModulesMetadata.map((module, index) => (
              <Fragment>
                <pre>{JSON.stringify(context.activeModules.data[module.key].active)}</pre>
              <Module
                name={module.name}
                id={index}
                thumbnailSource={module.thumbnailSource}
                thumbnailLabel={module.thumbnailLabel}
                inUse={context.activeModules.data[module.key].active}
              />
              </Fragment>
            ))}
          </ul>
        </div>
      )}
    </GeneralContext.Consumer>
)
};

export default ModulePicker;
