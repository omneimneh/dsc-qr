import React, {useEffect, useMemo} from 'react'
import {FieldProps} from "@keystone-6/core/types";
import {type controller} from '@keystone-6/core/fields/types/json/views'
import {FieldContainer, FieldLabel} from '@keystone-ui/fields'
import {SurveyCreator, SurveyCreatorComponent} from 'survey-creator-react';
import "survey-core/defaultV2.min.css";
import "survey-creator-core/survey-creator-core.i18n";
import "survey-creator-core/i18n/english";
import "survey-creator-core/i18n/arabic";
import "survey-creator-core/survey-creator-core.min.css";
import {surveyLocalization} from "survey-core";

surveyLocalization.supportedLocales = ["en", "ar"];

export const Field = ({field, value, onChange, autoFocus}: FieldProps<typeof controller>) => {

    const creator = useMemo(() => {
        const surveyCreator = new SurveyCreator({
            isAutoSave: true,
            showTranslationTab: true,
        });
        return surveyCreator;
    }, []);

    useEffect(() => {
        creator.text = value;
    }, [value]);

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
