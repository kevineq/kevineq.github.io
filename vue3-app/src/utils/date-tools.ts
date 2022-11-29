export const getChineseMouth = (m: number) => {
    switch (m) {
        case 0:
            return "一月";
        case 1:
            return "二月";
        case 2:
            return "三月";
        case 3:
            return "四月";
        case 4:
            return "五月";
        case 5:
            return "六月";
        case 6:
            return "七月";
        case 7:
            return "八月";
        case 8:
            return "九月";
        case 9:
            return "十月";
        case 10:
            return "十一月";
        case 11:
            return "十二月";
        default:
            return "";
    }
}

export const getDate = (dateStr: number) => {
    let y = dateStr.toString().slice(0, 4)
    let m = dateStr.toString().slice(4, 6)
    let d = dateStr.toString().slice(6)
    return `${y}-${m}-${d}`
}

export const getMonAndDayObj = (date: string): { m: string, d: string } => {
    let m = new Date(date).getMonth()
    let d = new Date(date).getDate()
    return {
        m: m >= 10 ? '' + m : '0' + m,
        d: d >= 10 ? '' + d : '0' + d
    }
}

export const getConcreteDate = () => {
    let date1 = new Date()
    let date2 = new Date()
    let date3 = new Date()
    date2.setDate(date1.getDate() - 14)
    date3.setDate(date1.getDate() + 1)
    let y1 = date1.getFullYear().toString()
    let m1 = (date1.getMonth() + 1).toString()
    let d1 = date1.getDate().toString()
    m1 = Number(m1) >= 10 ? '' + m1 : '0' + m1
    d1 = Number(d1) >= 10 ? '' + d1 : '0' + d1
    console.log(m1, d1)
    let y2 = date2.getFullYear().toString()
    let m2 = (date2.getMonth() + 1).toString()
    let d2 = date2.getDate().toString()
    m2 = Number(m2) >= 10 ? '' + m2 : '0' + m2
    d2 = Number(d2) >= 10 ? '' + d2 : '0' + d2
    console.log(m2, d2)
    let y3 = date3.getFullYear().toString()
    let m3 = (date3.getMonth() + 1).toString()
    let d3 = date3.getDate().toString()
    m3 = Number(m3) >= 10 ? '' + m3 : '0' + m3
    d3 = Number(d3) >= 10 ? '' + d3 : '0' + d3
    let fromDate = y2 + m2 + d2
    let toDate = y1 + m1 + d1
    let tomorrowDate = y3 + m3 + d3
    let id = new Date(date3).getTime().toString()
    console.log(fromDate, toDate, tomorrowDate)
    return {
        fromDate,
        toDate,
        tomorrowDate,
        id
    }
}

export const getWeek = (date: string) => {
    let week = new Date(date).getDay()
    switch (week) {
        case 0:
            return "周日";
        case 1:
            return "周一";
        case 2:
            return "周二";
        case 3:
            return "周三";
        case 4:
            return "周四";
        case 5:
            return "周五";
        case 6:
            return "周六";
        default:
            return "";
    }
}




