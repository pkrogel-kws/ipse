<script>
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import { SvelteToast, toast } from "@zerodevx/svelte-toast";

  import Modal, { store } from "./modal";
  import CloseIcon from "./CloseButton.svelte";
  import SpeakerForm from "./SpeakerForm.svelte";
  import AddButton from "./AddButton.svelte";

  const ROW_CLICK_EVENT_TYPE = "dblclick";
  //declare where you import script. these will change depending on
  //which page you are adding the modal to.
  // const MUTATION_OBSERVER_NODE_ID =
    // "ctl01_TemplateBody_WebPartManager1_gwpciNewQueryMenuCommon_ciNewQueryMenuCommon_ListerPanel";
  // const ADD_BTN_GROUP_ID =
  //   "ctl01_TemplateBody_WebPartManager1_gwpciNewQueryMenuCommon_ciNewQueryMenuCommon_ResultsGrid_TopRightPanel";
  let headers = [];
  const modalStore = store(false);
  const data = writable();
  let row;
  let rows;
  let ID;
  let formType;
  $: console.log($data, "parsed data from row");

  let rowClickListeners = [];

  const removeRowClickEventListeners = () => {
    rowClickListeners.forEach((removeListener) => {
      removeListener();
    });
    rowClickListeners = [];
  };

  const addClickHandlersToRows = () => {
    rows = document.querySelectorAll(".rgMasterTable > tbody > tr");

    rows.forEach((rowElem) => {
      const handleClickRow = () => {
        formType = "update";

        row = rowElem;
        $data = getDataFromRow(row);
        $data.Function_Start_Date = new Date($data.Function_Start_Date);
        $data.Function_End_Date = new Date($data.Function_End_Date);

        modalStore.open();
      };
      rowElem.addEventListener(ROW_CLICK_EVENT_TYPE, handleClickRow);
      rowClickListeners.push(() => {
        rowElem.removeEventListener(ROW_CLICK_EVENT_TYPE, handleClickRow);
      });
    });
  };

  const setupMutationObserver = () => {
    const targetNode = document.getElementById(MUTATION_OBSERVER_NODE_ID);

    const config = { attributes: false, childList: true, subtree: true };

    const callback = function (mutationsList, observer) {
      getHeaders();
      setupAddButton();
      removeRowClickEventListeners();
      addClickHandlersToRows();
      getID(); //needs to be after addClickHandlerToRows bc thats where it sets "rows". should change so order doesnt matter
    };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);

    // Later, you can stop observing

    return () => {
      observer.disconnect();
    };
  };

  const getDataFromRow = (row) => {
    // const dataCells = [...row.querySelectorAll("td")].map(elem=>elem.innerHTML);
    const dataCells = [...row.querySelectorAll("td")].map(
      (elem) => elem.textContent
    );
    const data = {};
    dataCells.forEach((val, index) => {
      // console.log({ val, index }, "dc-i");
      data[headers[index]] = val;
    });
    // console.log("dataCells", dataCells);
    return data;
  };

  const getHeaders = () => {
    headers = [
      ...document.querySelectorAll(
        ":not(.rgPager) > .rgMasterTable > thead > tr:not(.rgPager)>th"
      ),
    ].map((elem) => elem.getAttribute("aria-label"));
    console.log("headers set to", headers);
  };

  const getID = () => {
    if (rows && rows.length) {
      ID = rows[0].children[headers.indexOf("ID") || headers.indexOf("Id") || headers.indexOf("id")].innerText;
    }
  };

  const setupAddButton = () => {
    if (document.getElementById("addSpeakerBtn")) {
      return;
    }
    const buttonContainer = document.getElementById(ADD_BTN_GROUP_ID);
    const addBtn = new AddButton({
      target: buttonContainer,
      props: { onClick: handleClickAddBtn },
    });
  };

  const handleClickAddBtn = () => {
    //tODO:get empty data object like we do in imis store
    $data = { ID };
    formType = "create";
    deselectAllRows();
    modalStore.open();
  };

  const handleCloseModal = () => {
    //tODO:get empty data object like we do in imis store
    modalStore.close();
    setTimeout(() => {
      $data = { ID };
    }, 500);
  };

  onMount(() => {
    getHeaders();
    addClickHandlersToRows();
    setupAddButton();
    getID(); //needs to be after addClickHandlerToRows bc thats where it sets "rows". should change so order doesnt matter

    const removeMutationObserver = setupMutationObserver();

    return () => {
      removeRowClickEventListeners();
      removeMutationObserver();
    };
  });

  //map updated POST values to existing DOM so we don't have to refetch
  const handleEntityCreated = ({ detail }) => {
    toast.push(`Event successfully created`, {
      theme: {
        "--toastBackground": "#48BB78",
        "--toastProgressBackground": "#2F855A",
      },
    });
    const newRow = rows[0].cloneNode(true);

    row=newRow;
    patchRows(detail);

    //change row color
    newRow.classList.toggle('rgRow');
    newRow.classList.toggle('rgAltRow');
    //make id unique
    newRow.id =newRow.id.replace('__0', `__${rows.length}`);
    // console.log(newRow, 'newrow');
    rows[0].parentNode.insertBefore(newRow, rows[0]);
    


    formType = "update";
    rows = document.querySelectorAll(".rgMasterTable > tbody > tr");
    // console.log({row, rows});
  };

  const handleEntityUpdated = ({ detail }) => {
    toast.push(`Event successfully updated!`, {
      theme: {
        "--toastBackground": "#48BB78",
        "--toastProgressBackground": "#2F855A",
      },
    });
    patchRows(detail);
  };

  //remove row
  const handleEntityDeleted = () => {
    toast.push("Event successfully deleted!", {
      theme: {
        "--toastBackground": "#48BB78",
        "--toastProgressBackground": "#2F855A",
      },
    });
    row.parentNode.removeChild(row);
  };

  const patchRows = (data) => {
    console.log('patchRows, data: ', {row, data});
    data.forEach(([key, val]) => {
      // console.log("*", { key, val, headers, headerIdx: headers.indexOf(key) });
      const cellIndex = headers.indexOf(key);
      // console.log({cellIndex})
      if (cellIndex >= 0) {
        // console.log('here1',{row, 'row.children': row.children})
        const cell = row.children[cellIndex];
        // console.log({ cell });
        cell.innerText = val;
        // console.log("here2");
      }
    });
  }

  const deselectAllRows = () => {
    console.log('deselecting all rows', rows);
    //set aria-selected=false for all rows
    // rows.forEach(row=> row.setAttribute("aria-expanded", false));
    rows.forEach(row=> {
      row.setAttribute("aria-selected", false);
      row.classList.remove("rgSelectedRow");
      // consosle.log('set row ', row);
    });
  }
</script>

<Modal store={modalStore}>
  <div
    slot="header"
    bg="primary"
    display="flex"
    flex="row"
    align="center"
    px="8"
    py="4"
    text="white"
  >
    <h1 text="white lg">
      {formType === "create" ? "Add Speaker" : "Update Speaker"}
    </h1>
    <div flex="grow" />
    <CloseIcon onClick={handleCloseModal} />
  </div>
  <div slot="content" mx="8" position="relative">
    <SpeakerForm
      type={formType}
      {data}
      closeModal={handleCloseModal}
      on:entity-updated={handleEntityUpdated}
      on:entity-created={handleEntityCreated}
      on:entity-deleted={handleEntityDeleted}
    />
  </div>
  <!-- <div slot="footer" class="mx-8 flex" let:store={{ close }}>
    <button
      class="text-primary bg-transparent border border-solid border-primary hover:bg-primary hover:text-white active:bg-primary-600 font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
      type="button"
      on:click={modalStore.close}
    >
      Discard
    </button>
    <button
      class="text-primary bg-transparent border border-solid border-primary hover:bg-primary hover:text-white active:bg-primary-600 font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
      type="button"
      on:click={modalStore.close}
    >
      Reset
    </button>
    <div class="flex-grow" />
    <button
      class="bg-primary text-white active:bg-primary-600 font-bold uppercase text-sm px-6 py-3 rounded-lg shadow hover:bg-primary-600 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
      type="button"
    >
      <i class="fas fa-heart" /> Save
    </button>
  </div> -->
</Modal>
<SvelteToast options={{ reversed: true, intro: { y: 192 } }} />
