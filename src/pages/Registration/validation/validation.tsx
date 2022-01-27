import { Contestant, REGISTRATIONVARIANTS } from "../../../types/types";
import { GAMETYPES } from "../../../types/types";

export const notEmptyValidation = (value: any) => {
    if (value) {
        if (value.length > 1) {
            return true;
        }
    }
    return false;
}
  
export const nameValidation = (name: string) => {
    if (name.match(/(.+){2,}/)) {
        return true;
    } else {
        return false;
    }
}
export const discordValidation = (discord: string) => {
    if (discord.match(/^(.+)#[0-9]{4}$/)) {
        return true;
    } else {
        return false;
    }
}

export const emailValidation = (email: string) => {
    if (email.match(/^[a-zA-Z0-9!#$_*?^{}~-]+(\.[a-zA-Z0-9!#$_*?^{}~-]+)*@([a-zA-Z-]+\.)+[a-zA-z]{2,}$/)) {
        return true;
    } else {
        return false;
    }
}

export const contestantValidation = (contestant: Contestant, game: GAMETYPES, variant: REGISTRATIONVARIANTS) => {
    const messages = [];
    if (!nameValidation(contestant.name)) {
        messages.push('Jméno musí obsahovat alespoň dva znaky.')
    } 
    if (!nameValidation(contestant.surname)) {
        messages.push('Příjmení musí obsahovat alespoň dva znaky.')
    }
    if (!discordValidation(contestant.discord)) {
        messages.push('Zadaný discord je neplatný.')
    }
    if (!nameValidation(contestant.nickname)) {
        messages.push('Herní přezdívka musí obsahovat alespoň dva znaky');
    }
    if (!emailValidation(contestant.email)) {
        messages.push('Zadaný email je neplatný.')
    }
    if (game === GAMETYPES.COUNTER_STRIKE) {
        if (!contestant.faceitLevel) {
            messages.push('Chybí faceit level')
        }
        if (!notEmptyValidation(contestant.csRank)) {
            messages.push('Chybí rank')
        }
        if (!notEmptyValidation(contestant.maxCsRank)) {
            messages.push('Chybí maximální dosažený rank')
        }
        if (!contestant.maxFaceitLevel) {
            messages.push('Chybí maximální dosažený faceit level')
        }
    }
    if (game === GAMETYPES.ROCKET_LEAGUE) {
        if (!notEmptyValidation(contestant.epicId)) {
            messages.push('Chybí epic ID')
        }
    }
    if (variant === REGISTRATIONVARIANTS.TEAM) {
        if (!notEmptyValidation(contestant.role)) {
            messages.push('Role není vyplněna')
        }
    }
    return messages;
};

export default contestantValidation;