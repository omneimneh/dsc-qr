import React, {useEffect, useState} from 'react'
import {FieldProps} from "@keystone-6/core/types";
import {type controller} from '@keystone-6/core/fields/types/virtual/views'
import {FieldContainer, FieldLabel} from '@keystone-ui/fields'
import QRCode from 'qrcode'

export const Field = ({field, value, onChange, autoFocus}: FieldProps<typeof controller>) => {

    const [dataUrl, setDataUrl] = useState<string>();

    useEffect(() => {
        if (typeof value === "string") {
            QRCode.toDataURL(value).then((url) => setDataUrl(url));
        }
    }, [value]);

    return (
        <FieldContainer>
            <FieldLabel>{field.label}</FieldLabel>
            {dataUrl && <img src={dataUrl} alt='QR Code'/>}
        </FieldContainer>
    )
}
