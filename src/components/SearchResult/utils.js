import { Duration, DateTime} from 'luxon';
import {monthsShortNamesByNumbers, weekDaysByNumbers} from '../../constants'

const getNoTransfers = (data) => data.filter(item => !item.transfers);
const getOneTransfers = (data) => data.filter(item => item.transfers && item.transfers.length === 1);
const getTwoTransfers = (data) => data.filter(item => item.transfers && item.transfers.length === 2);
const getThreeAndMoreTransfers = (data) => data.filter(item => item.transfers && item.transfers.length > 2);

export const transfersFilter = (
  data,
  filter,
) => {
  const [all, no, one, two, threeAndMore] = Object.keys(filter);
  const filterFn = {
    [all]: () => data,
    [no]: () => getNoTransfers(data),
    [one]: () => getOneTransfers(data),
    [two]: () => getTwoTransfers(data),
    [threeAndMore]: () => getThreeAndMoreTransfers(data),
  };

  const key = [all, no, one, two, threeAndMore].find(el => filter[el]);

  return filterFn[key]();
};

export const returnInputs = (
  data,
  { all, no, one, two, threeAndMore },
) => {
  let checkboxes = [];

  // all filter exist always
  // so this item we should add anyway
  checkboxes.push({
    id: 'transfersAll',
    label: 'Все',
    checked: all,
    number: data.length,
  });

  const noFiltersData = getNoTransfers(data);
  if (!!noFiltersData.length) {
    checkboxes.push({
      id: 'transfersNo',
      label: 'Без пересадки',
      checked: no,
      number: noFiltersData.length,
    });
  }

  const oneFilter = getOneTransfers(data);
  if (!!oneFilter.length) {
    checkboxes.push({
      id: 'transfersOne',
      label: '1 пересадка',
      checked: one,
      number: oneFilter.length,
    });
  }

  const twoFilter = getTwoTransfers(data);
  if (!!twoFilter.length) {
    checkboxes.push({
      id: 'transfersTwo',
      label: '2 пересадки',
      checked: two,
      number: twoFilter.length,
    });
  }

  const threeFilter = getThreeAndMoreTransfers(data);
  if (!!threeFilter.length) {
    checkboxes.push({
      id: 'transfersThreeAndMore',
      label: '3 и более пересадок',
      checked: threeAndMore,
      number: threeFilter.length,
    });
  }

  return checkboxes;
}

export const formatDuration = (minutes) => {
  const duration = Duration.fromObject({ hours: 0, minutes: minutes }).normalize().toObject();
  let formattedString = duration.hours? `${duration.hours + 'ч '}` : '';
  formattedString += duration.minutes? `${duration.minutes + 'м '}` : '';
  return formattedString;
}

export const shortenDate = (date) => {
  const dateTime = DateTime.fromISO(date)
  return `${dateTime.day} ${monthsShortNamesByNumbers[dateTime.month]}, ${weekDaysByNumbers[dateTime.weekday]}`
}
