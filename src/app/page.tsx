
"use client";

import { useEffect, useState } from 'react';
import { get, ref } from 'firebase/database';
import { database } from '../firebaseConfig';
import { Unit } from '../units';

import {Button} from "@/components/ui/button";


export default function Home() {

 return <Button>go to /units url</Button>;
}
