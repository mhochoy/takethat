import {con} from './db.js';
import Take from "../js/models/take.js"


export async function get_takes() {
    const all = [];
    const sql = "SELECT * FROM take";
    const [takes_value] = await con.query(sql);

    const takes = JSON.parse(JSON.stringify(takes_value))

    for (const take of takes) {
        const t = new Take(take.author, take.message, take.date, take.category);

        all.push(t);
    }

    return all;
}

export async function get_take_by_id(take_id) {
    const sql = "SELECT * FROM take WHERE id = ?";
    const [take_value] = await con.query(sql, [take_id]);

    const take = JSON.parse(JSON.stringify(take_value));

    return take;
}

export async function get_takes_by_date(date) {
    const all = [];
    const sql = "SELECT * FROM take WHERE date = ?";
    const [takes_value] = await con.query(sql, [date]);

    const takes = JSON.parse(JSON.stringify(takes_value));

    for (const take of takes) {
        const t = new Take(take.author, take.message, take.date, take.category);

        all.push(t);
    }

    return takes;
}

export async function get_latest_take_id() {
    const sql = "SELECT MAX(id) FROM take";

    const [id_value] = await con.query(sql);

    const id = JSON.parse(JSON.stringify(id_value));

    return id[0]["MAX(id)"];
}

export async function create_take(take) {
    const id = await get_latest_take_id() + 1;
    const sql = "INSERT INTO take VALUES (?, ?, ?, ?, ?);";
    const [new_take_value] = await con.query(sql, [id, take.message, take.author, take.date, take.category]);

    const new_take = JSON.parse(JSON.stringify(new_take_value));

    return new_take;

}

const take = new Take("eggerton", "sometimes, cold water showers are useful", "2026-05-11 03:26:00");


let result = await get_takes();
let found_take = await get_take_by_id(1);
let found_takes = await get_takes_by_date("2026-05-11 03:26:00");
let newest_take  = await get_latest_take_id();
let created_take = await create_take(take);


console.log(newest_take);
console.log(created_take);