<script>
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import { SvelteToast, toast } from "@zerodevx/svelte-toast";

  import Modal, { store } from "./modal";
  import CloseIcon from "./CloseButton.svelte";
  import SpeakerForm from "./SpeakerForm.svelte";
  import AddButton from "./AddButton.svelte";

  const ROW_CLICK_EVENT_TYPE = "dblclick";
  const MUTATION_OBSERVER_NODE_ID =
    "ctl01_TemplateBody_WebPartManager1_gwpciNewQueryMenuCommon_ciNewQueryMenuCommon_ListerPanel";
  const ADD_BTN_GROUP_ID =
    "ctl01_TemplateBody_WebPartManager1_gwpciNewQueryMenuCommon_ciNewQueryMenuCommon_ResultsGrid_TopRightPanel";
  let headers = [];
  const modalStore = store(false);
  const data = writable();
  let row;
  let rows;
  let ID;
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
      ID = rows[0].children[headers.indexOf("ID")].innerText;
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
  let modalTitle;
  $: {
    if ($data && $data.ID) {
      modalTitle = "Update Speaker";
    } else {
      modalTitle = "New Speaker";
    }
  }

  //map updated POST values to existing DOM so we don't have to refetch
  const handleEntityUpdated = ({ detail }) => {
    const { type, data } = detail;
    toast.push(`Event successfully ${type}!`, {
      theme: {
        "--toastBackground": "#48BB78",
        "--toastProgressBackground": "#2F855A",
      },
    });
    detail.forEach(([key, val]) => {
      console.log("*", { key, val, headers, headerIdx: headers.indexOf(key) });
      const cellIndex = headers.indexOf(key);
      if (cellIndex >= 0) {
        const cell = row.children[cellIndex];
        cell.innerText = val;
      }
    });
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
    <h1 text="white lg">{modalTitle}</h1>
    <div flex="grow" />
    <CloseIcon onClick={handleCloseModal} />
  </div>
  <div slot="content" mx="8" position="relative">
    <SpeakerForm
      {data}
      closeModal={handleCloseModal}
      on:entity-updated={handleEntityUpdated}
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
