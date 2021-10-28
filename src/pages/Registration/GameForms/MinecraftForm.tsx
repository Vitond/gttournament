import Row from "../components/Row/Row";
import Label from "../components/Label/Label";
import TextInput from "../components/TextInput/TextInput";
import React, { useState } from 'react';
import Heading from "../../../components/typography/Heading";
import { headingTypes } from "../../../types/types";
import SelectInput from "../components/SelectInput/SelectInput";
import { ROLES } from "../../../types/types";
import DetailedInfo from "../components/DetailedInfo/DetailedInfo";

const MinecraftForm: React.FC<{}> = () => {
    const [name, setName] = useState('');
    const [role, setRole] = useState(ROLES.MEMBER);

    return <div>
        <Heading className='' type={headingTypes.h2}>Přihláška pro Minecraft</Heading>
        <Row>
            <Label htmlFor="min-name">Vaše herní jméno / nick.</Label>
            <TextInput setFunction={setName}id="min-name"></TextInput>
        </Row>
        <Row>
            <Label htmlFor="min-team">Jméno týmu, ve kterém jste.</Label>
            <DetailedInfo>Žádné vulgarismy!</DetailedInfo>
            <DetailedInfo>Pokud nemáte tým, zadejte "žádný" a organizátoři se Vám pokusí sestavit tým.</DetailedInfo>
            <TextInput setFunction={setName}id="min-team"></TextInput>
        </Row>
        <Row>
            <Label htmlFor="min-role">Vaše pozice v týmu.</Label>
            <SelectInput options={[{value: ROLES.MEMBER, display: 'Hráč'}, {value: ROLES.CAPTAIN, display: 'Kapitán'}]}setFunction={setName} id="min-role"></SelectInput>
        </Row>
    </div>
};

export default MinecraftForm;