/** @format */

"use server";

import { revalidatePath } from "next/cache";
import { auth } from "../../auth";
const session = await auth();
export async function addRequest(data) {
	let add = await fetch(`${process.env.BASE_URL}api/requests`, {
		method: "POST",
		body: JSON.stringify(data),
	});
	add = add.json();
	console.log("session in addrequest=>", session);

	return add;
}

export async function getRequest() {
	let requests = await fetch(`${process.env.BASE_URL}api/requests`);
	requests = requests.json();

	return requests;
}

export async function getSingleRequest(id) {
	let request = await fetch(`${process.env.BASE_URL}api/requests${id}`);
	request = request.json();

	return request;
}

export async function updateRequest(status) {
	let requests = await fetch(`${process.env.BASE_URL}api/requests`, {
		method: "PUT",
		body: JSON.stringify({ id, status }),
	});
	requests = requests.json();
	revalidatePath("/admin/requests");

	return requests;
}
