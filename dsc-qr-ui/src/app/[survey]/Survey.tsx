'use client'

import {gql} from '@/__generated__/gql';
import {useMutation, useQuery} from "@apollo/client";
import 'survey-core/defaultV2.min.css';
import {Model, SurveyModel} from "survey-core";
import {Survey} from 'survey-react-ui';
import {useCallback, useMemo} from "react";
import {CompleteEvent} from "survey-core/typings/survey-events-api";

const GET_SURVEY = gql(/* GraphQL */ `
    query GetSurvey($id: ID!) {
        survey(where: {id: $id}) {
            id
            form
        }
    }
`);

const SUBMIT_SURVEY = gql(/* GraphQL */ `
    mutation CreateSubmission($data: SubmissionCreateInput!) {
        createSubmission(data: $data) {
            id
        }
    }
`);


export default function SurveyWidget({id}: { id: string }) {
    const {data, loading, error} = useQuery(GET_SURVEY, {variables: {id}});
    const [submit] = useMutation(SUBMIT_SURVEY);

    const saveForm = useCallback(async (survey: SurveyModel, event: CompleteEvent) => {
        event.showSaveInProgress();
        try {
            await submit({
                variables: {
                    data: {
                        survey: {
                            connect: {id}
                        },
                        response: survey.data
                    }
                }
            });
            console.log(event);
            event.showSaveSuccess();
        } catch {
            event.showSaveError();
        }
    }, [id, submit]);

    const survey: Model | undefined = useMemo(() => {
        if (data?.survey) {
            const surveyModel = new Model(data.survey.form);
            surveyModel.onComplete.add(saveForm);
            return surveyModel;
        }
    }, [data?.survey]);


    if (loading) {
        return <h1>Loading...</h1>
    }

    if (error || !data) {
        return <h1>Error</h1>
    }

    if (survey) {
        return <div className='min-h-screen flex flex-col'>
            <Survey model={survey}/>
        </div>
    }
}