import React from 'react'
import {FieldProps} from "@keystone-6/core/types";
import {type controller} from '@keystone-6/core/fields/types/json/views'
import {FieldContainer, FieldLabel} from '@keystone-ui/fields'
import {SurveyCreator, SurveyCreatorComponent} from 'survey-creator-react';
import "survey-core/defaultV2.min.css";
import "survey-creator-core/survey-creator-core.min.css";


export const Field = ({field, value, onChange, autoFocus}: FieldProps<typeof controller>) => {

    const creator = new SurveyCreator({isAutoSave: true});
    creator.text = value;

    creator.saveSurveyFunc = function () {
        onChange?.(creator.text);
    }

    return (
        <FieldContainer autoFocus={autoFocus}>
            <FieldLabel>{field.label}</FieldLabel>
            <SurveyCreatorComponent creator={creator}/>
        </FieldContainer>
    )
}
