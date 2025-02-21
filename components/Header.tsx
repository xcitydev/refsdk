"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import "@near-wallet-selector/modal-ui/styles.css";
import React, { useEffect, useState, useRef } from "react";
import { setupBitteWallet } from "@near-wallet-selector/bitte-wallet";
import { setupLedger } from "@near-wallet-selector/ledger";
import { setupMeteorWallet } from "@near-wallet-selector/meteor-wallet";
import { setupSender } from "@near-wallet-selector/sender";
import { setupHereWallet } from "@near-wallet-selector/here-wallet";
import { setupNearMobileWallet } from "@near-wallet-selector/near-mobile-wallet";
import { setupWelldoneWallet } from "@near-wallet-selector/welldone-wallet";
import { Button } from "./ui/button";
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupModal } from "@near-wallet-selector/modal-ui";
import { setupNearWallet } from "@near-wallet-selector/near-wallet";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";
import { useWallet } from "./zustandStore";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { CreateDialog } from "./CreateDialog";
import Link from "next/link";
import { Wallet } from "lucide-react";

const Header = () => {
  const [account, setAccount] = useState<string | null>(null);
  const { setWallet, setSignedAccountId } = useWallet();

  const select = async () => {
    return await setupWalletSelector({
      network: "testnet",
      modules: [
        setupNearWallet(),
        setupMyNearWallet(),
        setupBitteWallet(),
        setupHereWallet(),
        setupNearMobileWallet(),
        setupWelldoneWallet(),
        setupSender(),
        setupLedger(),
        setupMeteorWallet(),
      ] as any,
    });
  };

  const handleConnect = async () => {
    try {
      const selector = await select();
      const modal = setupModal(selector, {
        contractId: "test.testnet",
      });

      modal.show();
      const accounts = await (await selector.wallet()).getAccounts();
      console.log(accounts);

      setAccount(accounts[0].accountId);
      setSignedAccountId(accounts[0].accountId);
      setWallet(selector.wallet());
    } catch (error) {
      console.log(error);
    }
  };

  const checkAccount = async () => {
    try {
      const selector = await select();
      const accounts = await (await selector.wallet()).getAccounts();
      console.log(accounts);
      setAccount(accounts[0].accountId);
      setSignedAccountId(accounts[0].accountId);
      setWallet(selector.wallet());
    } catch (error) {
      console.log(error);
    }
  };

  function SpinningLogo() {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state, delta) => {
      if (groupRef.current) {
        groupRef.current.rotation.y += delta * 0.5;
      }
    });

    return (
      <group ref={groupRef}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0.5, 0.5, 0.5]}>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial color="#cccccc" />
        </mesh>
        <mesh position={[-0.5, -0.5, -0.5]}>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial color="#999999" />
        </mesh>
      </group>
    );
  }
  const handleDisconnect = async () => {
    try {
      const selector = await select();
      await (await selector.wallet()).signOut();
      setAccount(null);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkAccount();
  }, []);

  return (
    <header className="absolute top-0 left-0 right-0 z-10 p-4">
      <nav className="flex justify-between items-center max-w-6xl mx-auto">
        <Link href="/" className="flex items-center">
          <div className="w-20 h-20">
            <Canvas camera={{ position: [0, 0, 5] }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <SpinningLogo />
            </Canvas>
          </div>
          <span className="text-2xl font-bold text-green-400">Ref Finance</span>
        </Link>
        {account ? (
          <>
            <div className="flex items-center gap-2">
              <div
                className="text-sm text-green-500 border px-3 py-2 font-semibold bg-white rounded-md"
                onClick={handleDisconnect}
              >
                Connected {account}
              </div>
              <div className="mx-4 flex items-center gap-2">
                <CreateDialog />
                <Link href="/withdraw">
                  <Wallet className="w-5 h-5 text-green-500 cursor-pointer hover:text-green-600" />
                </Link>
              </div>
            </div>
          </>
        ) : (
          <Button onClick={handleConnect}>Connect Wallet</Button>
        )}
      </nav>
    </header>
  );
};

export default Header;
