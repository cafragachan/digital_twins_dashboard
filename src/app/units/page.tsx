"use client";

import { useEffect, useState } from 'react';
import { get, ref, update } from 'firebase/database';
import { database } from '../../firebaseConfig';
import { Unit } from '../../units';
import React from "react";
import { UnitsDataTable } from "./data-table";
import { columns } from "./columns";

type Props = {};

const Units = (props: Props) => {
  // Get data units from database firebase
  const [units, setUnits] = useState<Unit[]>([]);

  useEffect(() => {
    const fetchUnits = async () => {
      const unitsRef = ref(database, 'accounts/stelling_properties/projects/12Hst_Southampton/units');
      const snapshot = await get(unitsRef);
      if (snapshot.exists()) {
        let data = snapshot.val() as Unit[];
        
        // Filter out units with type not in the specified list
        const validTypes = ['sp_t2', 'sp_t4', 'sp_t6', 'sp_t1', 'sp_twodio'];
        data = data.filter(unit => validTypes.includes(unit.type));

        setUnits(data);
        data.forEach(unit => {
          console.log(`Unit ID: ${unit.id}`);
        });
      } else {
        console.log("No data available");
      }
    };

    fetchUnits();
  }, []);

  const handlePriceChange = (id: number, newPrice: number) => {
    // Update the state
    setUnits(prevUnits => prevUnits.map(unit => 
      unit.id === id ? { ...unit, price: newPrice } : unit
    ));

    // Update Firebase
    const unitRef = ref(database, `accounts/stelling_properties/projects/12Hst_Southampton/units/${id}`);
    update(unitRef, { price: newPrice }).then(() => {
      console.log(`Updated price for unit ID: ${id} to ${newPrice}`);
    }).catch((error) => {
      console.error("Error updating price:", error);
    });
  };

  const handleAvailabilityChange = (id: number, isAvailable: boolean) => {
    // Update the state
    setUnits(prevUnits => prevUnits.map(unit => 
      unit.id === id ? { ...unit, is_available: isAvailable } : unit
    ));

    // Update Firebase
    const unitRef = ref(database, `accounts/stelling_properties/projects/12Hst_Southampton/units/${id}`);
    update(unitRef, { is_available: isAvailable }).then(() => {
      console.log(`Updated availability for unit ID: ${id} to ${isAvailable}`);
    }).catch((error) => {
      console.error("Error updating availability:", error);
    });
  };

  const handleRoomTypeChange = (id: number, Name: string) => {
    // Update the state
    setUnits(prevUnits => prevUnits.map(unit => 
      unit.id === id ? { ...unit, name: Name } : unit
    ));

    // Update Firebase
    const unitRef = ref(database, `accounts/stelling_properties/projects/12Hst_Southampton/units/${id}`);
    update(unitRef, { name: Name }).then(() => {
      console.log(`Updated room type for unit ID: ${id} to ${Name}`);
    }).catch((error) => {
      console.error("Error updating room type:", error);
    });
  };

  const handleDescriptionChange = (id: number, description_: string) => {
    // Update the state
    setUnits(prevUnits => prevUnits.map(unit => 
      unit.id === id ? { ...unit, description: description_ } : unit
    ));

    // Update Firebase
    const unitRef = ref(database, `accounts/stelling_properties/projects/12Hst_Southampton/units/${id}`);
    update(unitRef, { description: description_ }).then(() => {
      console.log(`Updated description for unit ID: ${id} to ${description_}`);
    }).catch((error) => {
      console.error("Error updating description:", error);
    });
  };

  return (
    <div className="container py-10 mx-auto">
      <UnitsDataTable
        columns={columns}
        data={units}
        onPriceChange={handlePriceChange}
        onAvailabilityChange={handleAvailabilityChange}
        onRoomTypeChange={handleRoomTypeChange}
        onDescriptionChange={handleDescriptionChange}
      />
    </div>
  );
};

export default Units;