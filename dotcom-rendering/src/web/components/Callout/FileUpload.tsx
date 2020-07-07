import React, { useState } from 'react';
import { css } from 'emotion';

import { textSans } from '@guardian/src-foundations/typography';
import { text } from '@guardian/src-foundations/palette';

import { stringifyFileBase64 } from '../../lib/stringifyFileBase64';
import { FieldLabel } from './FieldLabel';

const fileUploadInputStyles = css`
    padding-top: 10px;
    padding-bottom: 10px;
`;

const errorMessagesStyles = css`
    padding-bottom: 10px;
    color: ${text.error};
    ${textSans.medium({ fontWeight: 'bold' })};
`;

type Props = {
    formField: CampaignFieldFile;
    formData: { [key in string]: any };
    setFormData: React.Dispatch<React.SetStateAction<{ [x: string]: any }>>;
};

export const FileUpload = ({ formField, formData, setFormData }: Props) => {
    const [error, setError] = useState('');
    const onSelectFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            try {
                setError('');
                const stringifiedFile = await stringifyFileBase64(
                    e.target.files[0],
                );
                setFormData({
                    ...formData,
                    [formField.id]: stringifiedFile,
                });
            } catch (e) {
                setError(e);
            }
        }
    };

    return (
        <>
            <FieldLabel formField={formField} />
            <input
                data-testid={`form-field-${formField.id}`}
                className={fileUploadInputStyles}
                type="file"
                accept="image/*, .pdf"
                required={formField.required}
                onChange={onSelectFile}
            />
            <p>We accept images and pdfs. Maximum total file size: 6MB</p>
            {error && <div className={errorMessagesStyles}>{error}</div>}
        </>
    );
};
